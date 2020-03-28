const fs = require('fs');
const path = require('path')

const Courses = require('./courses')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'basket.json'
)

class Basket {
    
    static async add(id) {
        const basket = await Basket.fetch();
        const course = await Courses.getCourseById(id);
        const idx = basket.courses.findIndex(el => el.id === id)

        if ( idx === -1) {
            course.count = 1;
            basket.courses.push(course)
            
        } else {
            basket.courses[idx].count++;
        }

        basket.price +=  +course.price;
        
        return new Promise((resolve, reject) =>{
            fs.writeFile( p, JSON.stringify(basket), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve();
                    }
                }
            )

        })
    }

    static async remove(id) {
        const basket = await Basket.fetch();
        const idx = basket.courses.findIndex(el => el.id === id);
        const course = basket.courses[idx]

        if (course.count === 1) {
            basket.courses = basket.courses.filter(el => el.id !== id)

        } else {
            basket.courses[idx].count--; 
        }

        basket.price -=  course.price;

        return new Promise((resolve, reject) =>{
            fs.writeFile( p, JSON.stringify(basket), (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(basket);
                    }
                }
            )

        })

    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            } 
            )
        })
        
    }
}

module.exports = Basket;