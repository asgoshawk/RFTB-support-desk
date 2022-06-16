const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Note = require('../models/noteModel')
const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(
    async (req, res) => {
        // get user using the id in JWT
        const user = await User.findById(req.user.id)

        if (!user) {
            res.status(401)
            throw new Error('User not found.')
        }

        const ticket = await Ticket.findById(req.params.ticketId)

        if (!ticket) {
            res.status(404)
            throw new Error('Ticket not found.')
        }

        if (ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not autherizerd.')
        }

        const notes = await Note.find({ ticket: req.params.ticketId })

        res.status(200).json(notes)
    }
);

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(
    async (req, res) => {
        // get user using the id in JWT
        const user = await User.findById(req.user.id)

        if (!user) {
            res.status(401)
            throw new Error('User not found.')
        }

        const ticket = await Ticket.findById(req.params.ticketId)

        if (!ticket) {
            res.status(404)
            throw new Error('Ticket not found.')
        }

        if (ticket.user.toString() !== req.user.id) {
            res.status(401)
            throw new Error('Not autherizerd.')
        }

        const note = await Note.create({
            text: req.body.text,
            isStaff: false,
            user: req.user.id,
            ticket: req.params.ticketId,
        })

        res.status(200).json(note)
    }
);

module.exports = {
    getNotes,
    addNote,
}