const Orders = require('./../models/orders');

const mapToCourses = (basket) => {
    return basket.items.map(item => ({
        course: { ...item.courseId._doc },
        count: item.count
    }))
};

exports.ordersGet = async (req, res) => {
    const orders = await Orders.find({'user.userId': req.user._id}).populate('user.userId');

    res.render('orders', {
        title: 'Orders',
        isOrders: true,
        orders
    })
};

exports.ordersPost = async (req, res) => {
    try {
        const user = await req.user
            .populate('basket.items.courseId')
            .execPopulate();

        const courses = mapToCourses(user.basket);
        const price = courses.reduce((total, course) => {
            return total += course.course.price * course.count
        }, 0);

        const order = await new Orders({
            courses,
            user: {
                userId: user._id
            },
            price
        })
        await order.save();
        await req.user.clearBasket();
        res.redirect('/orders')
    } catch (err) {
        console.log(err);
    }
};