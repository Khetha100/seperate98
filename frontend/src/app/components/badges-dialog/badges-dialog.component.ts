import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Badge, BadgesService } from '../../services/badges.service';

@Component({
  selector: 'app-badges-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 z-50">
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        (click)="close.emit()"
      ></div>

      <div class="relative w-full h-full flex items-start justify-center pt-16">
        <div
          class="bg-white rounded-lg shadow-xl w-[350px] animate-in"
          (click)="$event.stopPropagation()"
        >
          <div class="flex items-center justify-between p-4 border-b">
            <h2 class="text-lg font-semibold text-gray-900">Your Badge</h2>
            <button
              class="text-gray-400 hover:text-gray-500 focus:outline-none"
              (click)="close.emit()"
            >
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="p-4">
            <!-- Badge Display -->
            <div
              *ngIf="badge"
              class="flex items-start space-x-4 p-3 rounded-lg"
            >
              <div class="relative flex-shrink-0">
                <img
                  [src]="badge.imageUrl"
                  [alt]="badge.name"
                  class="w-16 h-16 object-contain badge-bounce"
                />
                <div
                  class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                ></div>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ badge.name }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ badge.description }}
                </p>
                <p *ngIf="badge.dateGranted" class="text-xs text-gray-400 mt-2">
                  Earned {{ formatDate(badge.dateGranted) }}
                </p>
              </div>
            </div>

            <!-- Empty State -->
            <div *ngIf="!badge" class="text-center py-6">
              <p class="text-sm text-gray-500">
                No badges earned yet. Keep participating to earn badges!
              </p>
            </div>
          </div>

          <div class="border-t p-4">
            <button
              class="w-full px-4 py-2 bg-[#00967d] text-white rounded-md hover:bg-[#007d68] transition-colors duration-200 font-medium text-sm"
              (click)="close.emit()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-in {
        animation: slideIn 0.2s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .badge-bounce {
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-5px);
        }
      }
    `,
  ],
})
export class BadgesDialogComponent {
  @Input() badge: Badge | null = null;
  @Output() close = new EventEmitter<void>();

  constructor(private badgesService: BadgesService) {}

  formatDate(dateGranted: string): string {
    return this.badgesService.formatBadgeDate(dateGranted);
  }
}
