// controllers/therapist.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk mengambil semua data terapis (untuk halaman list)
exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await prisma.therapist.findMany();
    res.status(200).json(therapists);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk mengambil detail satu terapis berdasarkan ID
exports.getTherapistById = async (req, res) => {
  try {
    const { id } = req.params; // Mengambil ID dari URL
    const therapist = await prisma.therapist.findUnique({
      where: { id: parseInt(id) },
      include: {
        // Sertakan juga profil detailnya dalam satu query
        detailedProfile: true,
      },
    });

    if (!therapist) {
      return res.status(404).json({ message: 'Terapis tidak ditemukan.' });
    }

    res.status(200).json(therapist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};