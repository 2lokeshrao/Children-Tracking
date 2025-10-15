import { User } from '../types';

class AuthService {
  private currentUser: User | null = null;
  private authToken: string | null = null;

  async login(email: string, password: string): Promise<{ user: User; token: string; requires2FA?: boolean }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role: 'parent',
      twoFactorEnabled: false,
      createdAt: new Date(),
    };
    
    const token = 'mock_token_' + Math.random().toString(36);
    this.currentUser = user;
    this.authToken = token;
    
    return { user, token };
  }

  async register(email: string, password: string, name: string, role: 'parent' | 'child'): Promise<{ user: User; token: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      twoFactorEnabled: false,
      createdAt: new Date(),
    };
    
    const token = 'mock_token_' + Math.random().toString(36);
    this.currentUser = user;
    this.authToken = token;
    
    return { user, token };
  }

  async verify2FA(code: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return code.length === 6;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.authToken = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getToken(): string | null {
    return this.authToken;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.authToken !== null;
  }
}

export default new AuthService();
