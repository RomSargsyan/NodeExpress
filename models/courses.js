const {Schema, model} = require('mongoose');

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

course.method('toClient', function() {
    const course = this.toObject()
  
    course.id = course._id
    delete course._id
    return course
  })

module.exports = model('Course', course)






























// const uuid = require('uuid/v4');
// const fs = require('fs');
// const path = require('path')

// class Courses {
//     constructor(title, price, imgURL) {
//         this.title = title
//         this.price = price
//         this.imgURL = imgURL
//         this.id = uuid();
//     }
    
//     toJSON() {
//         return {
//             title: this.title,
//             price: this.price,
//             imgURL: this.imgURL,
//             id: this.id
//         }
//     }

//     async save() {
//         const courses = await Courses.getAll();
//         courses.push(this.toJSON())
        
//         return new Promise((resolve, reject) =>{
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve();
//                     }
//                 }
//             )

//         })
//     }
    
//     static getAll() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 'utf-8',
//                 (err, data) => {
//                    if (err) {
//                        reject(err)
//                    } else {
//                        resolve(JSON.parse(data))
//                    }
//                 }
//             )
//         })
//     }

//     static async getCourseById(id) {
//         const course =  await Courses.getAll();
//         return course.find(el => el.id === id);
//     }

//     static async update(updateCourse) {
//         const courses = await Courses.getAll();
//         const idx = courses.findIndex(course => course.id === updateCourse.id)
        
//         courses[idx] = updateCourse;
//         return new Promise((resolve, reject) =>{
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve();
//                     }
//                 }
//             )

//         })
//     }

// }

// module.exports = Courses;