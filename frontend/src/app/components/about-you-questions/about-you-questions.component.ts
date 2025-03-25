import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import {
  GradeSelection,
  SubjectSelection,
} from '../../types/grade-selection.interface';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { UserProfileService } from '../../services/userProfile.service';
import { User } from '../../types/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-about-you-questions',
  imports: [CommonModule],
  templateUrl: './about-you-questions.component.html',
  styleUrl: './about-you-questions.component.css',
})
export class AboutYouQuestionsComponent implements OnInit {
  step = 1;
  selectedGrade: number | null = null;
  selectedSubjects: string[] = [];

  userChoseSubjects: boolean = false;
  userChoseGrade: boolean = false;

  grades: GradeSelection[] = [];
  subjects: SubjectSelection[] = [];

  user: User | null = null

  firstName: string = '';

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private userProfileService: UserProfileService,
    private authService: AuthService
  ) {}

  getUserProfile(userId: number): void {
    this.authService.getUserProfile(userId).subscribe(
      (userData) => {
        this.firstName = userData.firstName;
      },
      (error) => {
        console.error('Error getting user profile:', error);
      }
    );
  }

  // this will fetch all of the grades and display them to the user for selection
  ngOnInit(): void {
    this.getGrades();
    this.getUserDetails();
    this.resetSelections();
  }

  //this will fetch the grades so they can select or choose
  getGrades() {
    this.subjectService.getGrades().subscribe((grades) => {
      this.grades = grades;
      console.log(grades);
      this.authService.currentUser.subscribe((user) => {
        this.user = user;
        console.log(user);
      })
    });
  }

  //fetched subjects for the grade selected
  fetchSubjects(gradeId: number) {
    this.subjectService.getSubjectsByGradeId(gradeId).subscribe(
      (subjects) => {
        this.subjects = subjects;
        console.log('Fetched subjects:', subjects);
      },
      (error) => {
        console.error('Error fetching subjects:', error);
      }
    );
  }

  selectGrade(gradeId: number) {
    console.log('Grade selected:', gradeId);
    this.selectedGrade = gradeId;
    this.userChoseGrade = true;
    this.fetchSubjects(gradeId);
  }

  toggleSubject(subjectId: string) {
    const index = this.selectedSubjects.indexOf(subjectId);
    if (index === -1) {
      this.selectedSubjects.push(subjectId);
    } else {
      this.selectedSubjects.splice(index, 1);
    }

    this.userChoseSubjects = this.selectedSubjects.length >= 2;
  }

  goNext() {
    if (this.step === 2 && this.selectedGrade == null) {
      this.userChoseGrade = true;
      return;
    } else {
      this.userChoseGrade = false;
    }

    // Require at least 2 subjects before proceeding
    if (this.step === 3 && this.selectedSubjects.length < 2) {
      this.userChoseSubjects = true;
      // localStorage.setItem('selectedGrade', this.selectedGrade);
    localStorage.setItem('selectedSubjects', JSON.stringify(this.selectedSubjects));
      console.log('userChoseGrade:', this.userChoseGrade);

      return;
    } else {
      this.userChoseSubjects = true;
    }

    if (this.step < 4) {
      this.step++;
    }

    //this goes to the confirmation page
    if (this.step === 5) {
      this.router.navigate(['/homePage']);
    }
  }

  skip() {
    this.router.navigate(['/home']);
  }

  // goNext() {
  //   if (this.step === 2 && this.selectedGrade === null) {
  //     this.userChoseGrade = true;
  //     return;
  //   }
  //   this.userChoseGrade = false;

  //   //at least 2 subjects required
  //   if (this.step === 3 && this.selectedSubjects.length < 2) {
  //     this.userChoseSubjects = true;
  //     return;
  //   }
  //   this.userChoseSubjects = false;
  //   if (this.step < 4) this.step++;

  //   if (this.step === 4){
  //     this.router.navigate(['/homePage']); //goes to homepage
  //   }
  // }

  goBack() {
    if (this.step > 1) this.step--;
  }

  nextStep() {
    this.step++;
  }

  getUserDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
  }

  submit() {
    console.log('Selected Grade:', this.selectedGrade);
    console.log('Selected Subjects:', this.selectedSubjects);

    // Save grade and subjects to local storage
    localStorage.setItem('selectedGrade', this.selectedGrade?.toString() || '');
    localStorage.setItem('selectedSubjects', JSON.stringify(this.selectedSubjects));

    this.router.navigate(['/home']);


    // const profileUpdate: User = {
    //   ...this.user,
    //   grade: this.selectedGrade || null,
    //   subjects: this.selectedSubjects,
    // };

    // this.userProfileService.updateUserProfile(profileUpdate).subscribe(
    //   (response: any) => {
    //     console.log('Profile updated:', response);
    //     alert('Selection Submitted Successfully!');
    //     this.router.navigate(['/home']);
    //   },
    //   (error: any) => {
    //     console.error('Error updating profile:', error);
    //   }
    // );
  }



  //resets tall selections on load
  resetSelections() {
    this.selectedGrade = null;
    this.selectedSubjects = [];
    this.userChoseGrade = false;
    this.userChoseSubjects = false;
  }
}
