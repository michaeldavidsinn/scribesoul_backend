// controllers/post.controller.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fungsi untuk mengambil semua postingan
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    // Mengganti nama author menjadi "Anonymous"
    const anonymousPosts = posts.map(post => ({
      ...post,
      author: { name: 'Anonymous' }
    }));

    res.status(200).json(anonymousPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Fungsi untuk membuat postingan baru
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const authorId = req.userId;

    if (!content) {
      return res.status(400).json({ message: 'Konten tidak boleh kosong.' });
    }

    const newPost = await prisma.post.create({
      data: {
        content,
        authorId,
      },
    });

    res.status(201).json({ message: 'Post berhasil dibuat!', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};