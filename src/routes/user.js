const { Router } = require('express');

const router = Router();

router.get("/", (req, res) => {
    return res.status(200).json({ usuarios: [{ id: "U001", nombre: "Juan" }, { id: "U002", nombre: "Pedro" }] });
})

router.get("/:id", (req, res) => {
    if (req.params.id === "U001") {
        return res.status(200).json({ usuario: { id: "U001", nombre: "Juan" } });
    }
    return res.status(404).json({ message: "Usuario no encontrado" });
});

router.post("/", (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        return res.status(201).json({ message: "Usuario creado" });
    }

    return res.status(400).json({ message: "Usuario no creado" });
})

router.delete("/:id", (req, res) => {
    if (req.params.id === "U001") {
        return res.status(200).json({ message: 'Usuario Eliminado' });
    }
    return res.status(404).json({ message: "Usuario no encontrado" });
})

module.exports = router;