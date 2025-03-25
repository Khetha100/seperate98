// import { Component } from '@angular/core';
// import { GradeSelection, SubjectSelection } from '../../types/grade-selection.interface';
// import { Router } from '@angular/router';
// import { SubjectService } from '../../services/subject.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-about-you-teacher',
//   imports: [CommonModule],
//   templateUrl: './about-you-teacher.component.html',
//   styleUrl: './about-you-teacher.component.css'
// })
// export class AboutYouTeacherComponent {

//   step = 1;
//   // selectedGrade: number | null = null;
//   selectedSubjects: string[] = [];
//   selectedGrade: string[] = [];

//   userChoseSubjects: boolean = false;
//   userChoseGrade: boolean = false;

//   grades: GradeSelection[] = [];
//   subjects: SubjectSelection[] = [];

//   constructor(private subjectService: SubjectService, 
//     private router: Router,
// )
//      {}

//   // this will fetch all of the grades and display them to the user for selection
//   ngOnInit(): void {
//     this.getGrades();
//     this.resetSelections();
//   }

//   //this will fetch the grades so they can select or choose
//   getGrades() {
//     this.subjectService.getGrades().subscribe((grades: GradeSelection[]) => {
//       this.grades = grades;
//       console.log(grades);
//     });
//   }
//   fetchSubjects(gradeId: number) {
//     this.subjectService.getSubjectsByGradeId(gradeId).subscribe(
//       (subjects: SubjectSelection[]) => {
//         this.subjects = subjects;
//         console.log('Fetched subjects:', subjects);
//       },
//       (error) => {
//         console.error('Error fetching subjects:', error);
//       }
//     );
//   }

  //fetched subjects for the grade selected
  // fetchSubjects(gradeId: number) {
  //   this.subjectService.getSubjectsByGradeId(gradeId).subscribe(
  //     (subjects) => {
  //       this.subjects = subjects;
  //       console.log('Fetched subjects:', subjects);
  //     },
  //     (error) => {
  //       console.error('Error fetching subjects:', error);
  //     }
  //   );
  // }

  // selectGrade(gradeName: string) {
  //   const index = this.selectedGrade.indexOf(gradeName);
  //   if (index === -1) {
  //     this.selectedGrade.push(gradeName); // Add grade if not already selected
  //   } else {
  //     this.selectedGrade.splice(index, 1); // Remove grade if already selected
  //   }
  //   this.userChoseGrade = this.selectedGrade.length > 0; // At least one grade is selected
  //   if (this.selectedGrade.length > 0) {
  //     // Fetch subjects for the selected grade(s)
  //     // This will use the first selected grade, but you could extend to handle multiple grades
  //     this.fetchSubjects(this.grades.find(grade => grade.name === this.selectedGrade[0])?.id || 0);
  //   }
  // }

  // // selectGrade(gradeId: number) {
  // //   console.log("Grade selected:", gradeId)
  // //   this.selectedGrade = gradeId;
  // //   this.userChoseGrade = true; 
  // //   this.fetchSubjects(gradeId);
  // // }

  // toggleSubject(subjectId: string) {
  //   const index = this.selectedSubjects.indexOf(subjectId);
  //   if (index === -1) {
  //     this.selectedSubjects.push(subjectId); // Add subject if not already selected
  //   } else {
  //     this.selectedSubjects.splice(index, 1); // Remove subject if already selected
  //   }

  //   this.userChoseSubjects = this.selectedSubjects.length >= 2; // Require at least 2 subjects
  // }

  // // toggleSubject(subjectId: string) {
  // //   const index = this.selectedSubjects.indexOf(subjectId);
  // //   if (index === -1) {
  // //     this.selectedSubjects.push(subjectId);
  // //   } else {
  // //     this.selectedSubjects.splice(index, 1);
  // //   }

  // //   this.userChoseSubjects = this.selectedSubjects.length >= 2; 
  // // }

  // goNext() {
  //   if (this.step === 2 && this.selectedGrade == null) {
  //     this.userChoseGrade = true;
  //     return;
  //   } else {
  //     this.userChoseGrade = false;

  //   }
   
  
  //   // Require at least 2 subjects before proceeding
  //   if (this.step === 3 && this.selectedSubjects.length < 2) {
  //     this.userChoseSubjects = true;
  //     console.log("userChoseGrade:", this.userChoseGrade);

  //     return;
  //   } else {
  //     this.userChoseSubjects = true;

  //   }
    
  
  //   if (this.step < 4) {
  //     this.step++;
  //   }
  
  //   //this goes to the confirmation page
  //   if (this.step === 5) {  
  //     this.router.navigate(['/homePage']);
  //   }
  // }
  

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

  // goBack() {
  //   if (this.step > 1) this.step--;
  // }

  // nextStep() {
  //   this.step++;
  // }

  // submit() {
  //   console.log('Selected Grade:', this.selectedGrade);
  //   console.log('Selected Subjects:', this.selectedSubjects);
  //   alert('Selection Submitted Successfully!');
  //   this.router.navigate(['/homePage']);

  // }


  //resets tall selections on load
//   resetSelections() {
//     this.selectedGrade = [];  
//     this.selectedSubjects = [];  
//     this.userChoseGrade = false;
//     this.userChoseSubjects = false;
//   }


// }
