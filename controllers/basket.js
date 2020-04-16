const Course = require('../models/courses');

const mapToCourses = (basket) => {
    return basket.items.map(item => ({
        ...item.courseId._doc,
        id: item.courseId.id,
        count: item.count

    }))
}

const computePrice = (courses) => {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

exports.basketGet = async (req, res) => {
    const user = await req.user
        .populate('basket.items.courseId')
        .execPopulate()

    const courses = mapToCourses(user.basket);
    const price = computePrice(courses);

    res.render('basket', {
        title: 'basket',
        isCard: true,
        courses,
        price
    })
}

 exports.basketPost = async (req, res) => {
    const course = await Course.findById(req.body.id);
    await req.user.addToBasket(course);

    res.redirect('/basket');
}


exports.basketDelete = async (req, res) => {
    await req.user.removeFromBasket(req.params.id);
    const user = await req.user
        .populate('basket.items.courseId')
        .execPopulate();

    const courses = mapToCourses(user.basket);
    const basket = {
        courses, price: computePrice(courses)
    }
    res.status(200).json(basket)
}
