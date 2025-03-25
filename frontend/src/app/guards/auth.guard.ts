// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { filter, map } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//     const authService = inject(AuthService);
//     const router = inject(Router);

//     return authService.authState$.pipe(
//         filter((currentUser) => currentUser! == undefined),
//         map((currentUser) => {
//             if (!currentUser) {
//                 router.navigate
//                 return false;
//             }
//             return true;
//         })
//     )  
// };

