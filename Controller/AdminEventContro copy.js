const Event = require("../Model/AdminEvent");

// const createEvent = async (req, res) => {
//     try {
//         const {
//             eventTitle,
//             date,
//             startTime,
//             endTime,
//             description,
//             hostedBy,
//             hostedProfileLink,
//             location,
//             category,
//             tags = "",  // default to empty string if tags are not provided
//             ticketPrice = 0,
//             capacity = 0
//         } = req.body;

//         // ✅ Save the uploaded image path
//         const eventImage = req.file ? `/uploads/${req.file.filename}` : null;

//         // Check if required fields are present
//         if (!eventTitle || !date || !startTime || !endTime || !description || !hostedBy || !location || !category) {
//             return res.status(400).json({ error: "All required fields must be provided" });
//         }

//         // Convert tags string into an array and remove extra spaces from each tag
//         const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

//         const event = new Event({
//             eventTitle,
//             date,
//             startTime,
//             endTime,
//             description,
//             hostedBy,
//             hostedProfileLink,
//             location,
//             eventImage,
//             category,
//             tags: tagsArray,  // Store the tags as an array
//             ticketPrice,
//             capacity
//         });

//         await event.save();
//         res.status(201).json({ message: "Event created successfully", event });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };


const createEvent = async (req, res) => {
    try {
        const {
            eventTitle,
            date,
            startTime,
            endTime,
            description,
            hostedBy,
            hostedProfileLink,
            location,
            category,
            tags = "",
            ticketPrice = 0,
            capacity = 0
        } = req.body;

        // 🔍 Check uploaded file
        console.log("Uploaded File:", req.file);

        // ✅ Save uploaded image path
        const eventImage = req.file ? `/uploads/${req.file.filename}` : null;

        // Validation
        if (!eventTitle || !date || !startTime || !endTime || !description || !hostedBy || !location || !category) {
            return res.status(400).json({ error: "All required fields must be provided" });
        }

        // Convert tags string to array
        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        const event = new Event({
            eventTitle,
            date,
            startTime,
            endTime,
            description,
            hostedBy,
            hostedProfileLink,
            location,
            eventImage,
            category,
            tags: tagsArray,
            ticketPrice,
            capacity
        });

        await event.save();
        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get All Events
const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const uploadFile = async (req, res) => {
    if (req.file.size < (1024 * 50)) {
        res.status(200).send({ message: "Success", data: "http://localhost:8080/upload/" + req.file.originalname })
    } else {
        fs.unlinkSync("./uploads" + req.file.filename)
        res.status(404).send({ message: "Failed...", data: "", error: "img size is larger" })
    }
}

// Get Event by ID
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Event
// const updateEvent = async (req, res) => {
//     try {
//         const updateData = req.body;

//         if (req.file) {
//             updateData.eventImage = req.file.path;
//         }

//         const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

//         if (!updatedEvent) {
//             return res.status(404).json({ error: "Event not found" });
//         }

//         res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
const updateEvent = async (req, res) => {
    try {
        const updateData = req.body;

        // ✅ If a new image is uploaded, update the image path
        if (req.file) {
            updateData.eventImage = `/uploads/${req.file.filename}`;
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Delete Event
const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    uploadFile
};


//http://localhost:8080/adminEvent/create