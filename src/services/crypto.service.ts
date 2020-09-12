import bcrypt from 'bcrypt';

export class CryptoService {
    private saltRounds: number = 12;

    public hashPassword = async (password: string): Promise<string> => {
        return await bcrypt.hash(password, this.saltRounds);
    }
}