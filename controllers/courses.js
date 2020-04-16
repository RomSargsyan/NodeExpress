const Courses = require('../models/courses');

exports.coursesGet = async (req, res) => {
    try {
        const courses = await Courses.find()
            .populate('userId', 'email name')
            .select();

        res.render('courses/courses', {
            title: 'Courses',
            isCourses: true,
            courses,
            userId: req.user ? req.user._id.toString() : null,
        })
    } catch (err) {
        console.log(err);
    }
};

 exports.courseGet = async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id)

        res.render('courses/course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        })
    } catch (err) {
        console.log(err);
    }
};

exports.editGet = async (req, res) => {
    const course = await Courses.findById(req.params.id)
    
    if (course.userId.toString() !== req.user._id.toString()) {
        res.redirect('courses/courses')
    } else {
        if (!req.query.allow) {
            res.redirect('/')
        } else {
            res.render('courses/edit', {
                title: `Edit ${course.title}`,
                course
            })
        }
    }
};

exports.coursePost = async (req, res) => {
    try {
        const { id } = req.body;
        delete req.body.id;
        
        const course = await Courses.findByIdAndUpdate(id, req.body)
        res.redirect('/courses')
    } catch (err) {
        console.log(err);
    }
};

exports.removePost = async (req, res) => {
    try {
        await Courses.findByIdAndRemove(req.body.id)
        res.redirect('/courses')
    } catch (err) {
        console.log(err);
    }
};