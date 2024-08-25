import * as bcrypt from 'bcryptjs';


/**
 * Hashes a password using bcrypt.
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 */
const hashPassword = async (password: string): Promise<string> => {
    // Generate a unique salt for each password
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt using bcrypt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

export default hashPassword;
