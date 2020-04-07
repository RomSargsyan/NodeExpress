const { Schema, model } = require('mongoose');

const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    resetToken: String,
    resetTokenExp: Date,
    basket: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Course'
                }
            }
        ]
    }
})


user.methods.addToBasket = function (course) {
    let items = [...this.basket.items];
    const idx = items.findIndex(item => item.courseId.toString() === course._id.toString())
    if (idx === -1) {
        items.push({count: 1, courseId: course._id})
    } else {
        items[idx].count++;
    }
    
    this.basket = { items };
    return this.save();
}

user.methods.removeFromBasket = function (id) {
    let items = [...this.basket.items];
    const idx = items.findIndex(item => item.courseId.toString() === id.toString()) 
    if (items[idx].count === 1) {
        items = items.filter(item => item.courseId.toString() !== id.toString())
    }  else {
        items[idx].count--;
    }  
    
    this.basket = {items};
    
    return this.save();
}

user.methods.clearBasket = function () {
    this.basket.items = [];
    return this.save();
}

module.exports = model('User', user)