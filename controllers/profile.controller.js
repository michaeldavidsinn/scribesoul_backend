// controllers/profile.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.saveOnboarding = async (req, res) => {
  // Kita mendapatkan userId dari middleware, bukan dari body request
  const userId = req.userId;
  const profileData = req.body;

  try {
    const newProfile = await prisma.userProfile.create({
      data: {
        ...profileData, // Sebar semua data dari body
        userId: userId, // Hubungkan dengan user yang sedang login
      },
    });
    res.status(201).json({ message: 'Profil berhasil disimpan!', profile: newProfile });
  } catch (error) {
     if (error.code === 'P2002') { // Error jika profil untuk userId ini sudah ada
      return res.status(400).json({ message: 'Profil untuk pengguna ini sudah ada.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};