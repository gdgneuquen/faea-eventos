import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();

           return value.filter(value =>
            value.aula.toLowerCase().indexOf(input) > -1 || 
                value.actividad.toLowerCase().indexOf(input) > -1 ||
                    value.profesor.toLowerCase().indexOf(input) > -1
            );
            
        }
        return value;
    }
}