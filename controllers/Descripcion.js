let Descripcion = require('../models/Descripcion');

const controller = {
    getDescriptions: function (req, res) {
        Descripcion.find({}).exec()
            .then(descriptionList => {
                if (!descriptionList || descriptionList.length === 0) {
                    return res.status(404).send({ message: "No data found" });
                }
                return res.status(200).json(descriptionList);
            })
            .catch(err => res.status(500).send({ message: `Error: ${err}` }));
    },
    getDescription: function (req, res) {
        let descriptionId = req.params.id;
        console.log('Description ID:', descriptionId);
        if (!descriptionId) {
            return res.status(400).send({ message: "Description ID not provided" });
        }

        Descripcion.findById(descriptionId).exec()
            .then(description => {
                if (!description) {
                    return res.status(404).send({ message: "Description not found" });
                }
                return res.status(200).json(description);
            })
            .catch(err => res.status(500).send({ message: `Internal error: ${err}` }));
    },

    saveDescriptions: function (req, res) {
        let descripcion = new Descripcion();

        const { nombre, fecha, ubicacion, participantes } = req.body;

        if (nombre && fecha && ubicacion && participantes) {
            descripcion.nombre = nombre;
            descripcion.fecha = fecha;
            descripcion.ubicacion = ubicacion;
            descripcion.participantes = participantes;

            descripcion.save()
                .then(storedDescripcion => {
                    res.status(200).json({ Descripcion: storedDescripcion });
                })
                .catch(error => {
                    console.error("Error while saving the document:", error);
                    res.status(500).send({ message: "Error while saving the document" });
                });
        } else {
            return res.status(400).send({ message: "Data is not right" });
        }
    },

    updateDescripcion: function (req, res) {
        let descripcionId = req.params.id;
        let updateData = req.body;

        Descripcion.findByIdAndUpdate(descripcionId, updateData, { new: true })
            .then(updatedDescripcion => {
                if (!updatedDescripcion) {
                    return res.status(404).send({ message: "The document does not exist" });
                }
                return res.status(200).json(updatedDescripcion);
            })
            .catch(error => {
                console.error("Error while updating:", error);
                return res.status(500).send({ message: "Error while updating the document" });
            });
    },

    deleteDescripcion: function (req, res) {
        let descripcionId = req.params.id;

        Descripcion.findByIdAndDelete(descripcionId)
            .then(removedDescripcion => {
                if (!removedDescripcion) {
                    return res.status(404).send({ message: "The Descripcion does not exist" });
                }
                return res.status(200).json({ message: "Descripcion deleted successfully", removedDescripcion });
            })
            .catch(err => {
                console.error("Error while deleting:", err);
                return res.status(500).send({ message: "Error while deleting the Descripcion" });
            });
    }



}

module.exports = controller;
