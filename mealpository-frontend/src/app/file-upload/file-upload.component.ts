import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeService } from '../recipes/services/add-recipe.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  @Output() fileProcessed = new EventEmitter<string[]>();

  fileSelected: boolean = false;

  constructor(
    private addRecipeService: AddRecipeService
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
      this.fileSelected = true;
    }
  }
  
  handleFile(file: File): void {
    const processedFile = this.addRecipeService.performOCR(file);
    this.fileProcessed.emit(processedFile);
    /*
    const ocrSubscription = this.addRecipeService.performOCR(file).subscribe({
      next: (processedFile) => {
        this.fileProcessed.emit(processedFile);
      },
      error: (error) => {
        console.error('Error processing file:', error);
      },
      complete: () => {
        ocrSubscription.unsubscribe();
      }});
      */
  }


}
