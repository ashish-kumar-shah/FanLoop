
const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ success: false, message: "Token not found" });
    }
// Simple in-memory store for revoked tokens
const revokedTokens = new Set();

    // Add token to revokedTokens set
    revokedTokens.add(token);

    // Clear the cookie by setting it to expire immediately
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
       sameSite: "none",
      expires: new Date(0)
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = logout