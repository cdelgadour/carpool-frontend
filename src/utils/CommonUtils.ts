export class CommonUtils {
    static formatDate(dateToFormat: string): string {
        try {
            const date = new Date(dateToFormat);
            const formatter = new Intl.DateTimeFormat('es-ES', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
            });

            const formattedDate = formatter.format(date);
            const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

            return capitalizedDate;
        } catch (error) {
            console.error('Error occurred while formatting the date:', error);
            return '';
        }
    }
}