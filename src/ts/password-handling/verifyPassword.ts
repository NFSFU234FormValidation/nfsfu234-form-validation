import * as bcrypt from 'bcryptjs';

/**
 * Verify a password against a hashed password.
 * @param {string} stringPassword - The plain text password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @param {boolean} [isHashed=false] - Indicates whether the provided password is already hashed. Default is false.
 * @returns {Promise<boolean>} Returns a promise that resolves to true if the passwords match, false otherwise.
 */
const verifyPassword = async (stringPassword: string, hashedPassword: string, isHashed: boolean = false): Promise<boolean> => {
    try {
        if (isHashed) {
            // Use bcrypt.compare to compare hashed passwords.
            const match = await bcrypt.compare(stringPassword, hashedPassword);
            return match; // Return the result of the comparison.
        } else {
            // Compare plain text passwords directly.
            return stringPassword === hashedPassword;
        }
    } catch (error) {
        console.error("Error comparing passwords: ", error); // Log an error if bcrypt.compare encounters an issue.
        return false; // Return false in case of an error.
    }
};

export default verifyPassword;
