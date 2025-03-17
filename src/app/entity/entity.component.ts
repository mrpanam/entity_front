import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Entity, recordId } from '../model/entity';
import { EntityService } from '../services/entity.service';
import { EntityCreationComponent } from '../entity-creation/entity-creation.component';

@Component({
  selector: 'app-entity',
  standalone: true,
  imports: [CommonModule, FormsModule, EntityCreationComponent],
  templateUrl: './entity.component.html',
  styleUrl: './entity.component.css'
})
export class EntityListComponent implements OnInit {
  entities: (Entity & { editing?: boolean })[] = [];

  constructor(private entityService: EntityService) { }

  ngOnInit() {
    this.loadEntities();
  }

  loadEntities() {
    this.entityService.getEntities().subscribe(entities => {
      this.entities = entities;
    });
  }

  formatId(id: any): string {
    if (!id) return '';

    // Handle the nested structure where id.id is an object with a String property
    if (id.id && typeof id.id === 'object' && id.id.String) {
      return id.id.String;
    }

    // Fallback for other formats
    if (id.id && typeof id.id === 'string') {
      return id.id;
    }

    return '';
  }

  startEdit(entity: Entity & { editing?: boolean }) {
    entity.editing = true;
  }

  updateEntity(entity: Entity & { editing?: boolean }) {
    const idString = this.entityService.getIdString(entity.id);
    // Only send the name for updates
    const entityForUpdate = { name: entity.name };

    this.entityService.updateEntity(idString, entityForUpdate).subscribe(() => {
      this.loadEntities();
    });
  }

  cancelEdit(entity: Entity & { editing?: boolean }) {
    entity.editing = false;
    this.loadEntities();
  }

  deleteEntity(entity: Entity) {
    if (confirm('Are you sure you want to delete this entity?')) {
      const idString = this.entityService.getIdString(entity.id);
      this.entityService.deleteEntity(idString).subscribe(() => {
        this.loadEntities();
      });
    }
  }
}