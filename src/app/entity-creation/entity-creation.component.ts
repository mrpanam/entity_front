import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntityInput } from '../model/entity';
import { EntityService } from '../services/entity.service';

@Component({
  selector: 'app-entity-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entity-creation.component.html',
  styleUrl: './entity-creation.component.css'
})
export class EntityCreationComponent {
  @Output() entityCreated = new EventEmitter<void>();

  showForm = false;
  newEntity: EntityInput = { name: '' };
  newEntityId: string = '';

  constructor(private entityService: EntityService) { }

  showCreateForm() {
    this.showForm = true;
    this.newEntity = { name: '' };
    this.newEntityId = '';
  }

  createEntity() {
    // Create a new object with the expected format for the backend
    const entityForBackend: EntityInput = {
      id: this.newEntityId || undefined,  // Only include if provided, otherwise backend will generate one
      name: this.newEntity.name
    };

    this.entityService.createEntity(entityForBackend).subscribe(() => {
      this.entityCreated.emit();
      this.showForm = false;
    });
  }
}
