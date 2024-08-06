import { computed, signal } from '@angular/core';
import { Role, User } from '../types/user.interface';

export const user = signal<null | User>(null);
export const isAdmin = computed(() => user()?.role === Role.Admin);
export const isLoggedIn = computed(() => !!user());
