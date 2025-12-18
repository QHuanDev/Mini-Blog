import pool from "./database.js";

const connectDB = async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connected");
    conn.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
