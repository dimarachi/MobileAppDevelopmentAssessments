//A user of the app (volunteer or event organizer)
export interface User {
    name: {
        first: string;
        last: string;
    };
    email: string;
    id: string;
    mobile: string;
}
