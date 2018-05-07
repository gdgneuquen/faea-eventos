import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                return (el.actividad.toLowerCase().indexOf(input) > -1 || el.profesor.toLowerCase().indexOf(input.toLowerCase()) > -1 || el.aula.toLowerCase().indexOf(input.toLowerCase()) > -1);
            })
        }
        return value;
    }
}