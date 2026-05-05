import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      'products',
      'title price image category rating'
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle product in wishlist (Add/Remove)
// @route   POST /api/wishlist
// @access  Private
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    const index = wishlist.products.indexOf(productId);

    if (index === -1) {
      // Add to wishlist
      wishlist.products.push(productId);
    } else {
      // Remove from wishlist
      wishlist.products.splice(index, 1);
    }

    await wishlist.save();
    
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate(
      'products',
      'title price image category rating'
    );
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getWishlist, toggleWishlist };
