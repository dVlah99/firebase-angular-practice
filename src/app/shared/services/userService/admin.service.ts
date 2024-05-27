import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User, userRoles } from '../../types/user.type';
import { AuthService } from '../authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseError } from 'firebase/app';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private usersCollection = this.firestore.collection<Partial<User>>('users');
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  async changeUserRoleToAdmin(userId: string): Promise<void> {
    try {
      await this.firestore
        .collection('users')
        .doc(userId)
        .update({ role: 'ADMIN' });
    } catch (error) {
      throw error;
    }
  }

  async addAdmin(email: string): Promise<User> {
    try {
      const user = await this.authService.searchUserByEmail(email);
      console.log('admin user: ', user);
      if (user.user.role === userRoles.ADMIN) {
        this.toastr.warning('User is already an admin', 'Warnning');
        throw new Error('User is already admin');
      }

      await this.changeUserRoleToAdmin(user.documentId);

      this.changeUserRoleToAdmin;
      return user.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        throw error;
      }
      throw error;
    }
  }
}
