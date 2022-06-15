const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        product: {
            type: String,
            required: [true, 'Please select a product.'],
            enum: ['Galaxy S22', 'Galaxy Tab S8', 'Galaxy A53 5G', 'Galaxy Z Flip3', 'Galaxy S21', 'Galaxy Watch', 'Galaxy Buds',],
        },
        description: {
            type: String,
            required: [true, 'Please enter a description of the issue.'],
        },
        status: {
            type: String,
            required: true,
            enum: ['new', 'open', 'closed'],
            default: 'new',
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ticket', ticketSchema);