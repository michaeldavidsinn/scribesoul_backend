// controllers/group.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mengambil semua grup yang tersedia
exports.getAllGroups = async (req, res) => {
  try {
    const groups = await prisma.group.findMany();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Bergabung dengan sebuah grup
exports.joinGroup = async (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const userId = req.userId;

    await prisma.group.update({
      where: { id: groupId },
      data: {
        members: {
          connect: { id: userId }, // Menghubungkan user saat ini ke dalam list members
        },
      },
    });

    res.status(200).json({ message: 'Berhasil bergabung dengan grup!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mengambil semua pesan dari sebuah grup
exports.getGroupMessages = async (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const messages = await prisma.groupMessage.findMany({
      where: { groupId: groupId },
      orderBy: { createdAt: 'asc' }, // Urutkan dari yang terlama
      include: {
        sender: { select: { name: true } }, // Sertakan nama pengirim
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mengirim pesan ke sebuah grup
exports.sendMessage = async (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const senderId = req.userId;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Konten pesan tidak boleh kosong.' });
    }

    const newMessage = await prisma.groupMessage.create({
      data: {
        content,
        groupId,
        senderId,
      },
    });

    res.status(201).json({ message: 'Pesan terkirim!', message: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};