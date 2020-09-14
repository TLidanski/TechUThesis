import bcrypt from 'bcrypt';

export class CryptoService {
    private saltRounds: number = 12;

    public hashPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, this.saltRounds);
    }

    public comparePassword = async (password: string, hashedPassword: string): Promise<Boolean> => {
        return await bcrypt.compare(password, hashedPassword);
    }
}