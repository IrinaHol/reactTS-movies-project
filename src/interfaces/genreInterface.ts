 interface IGenre {
        id: number,
        name: string
}

 interface IGenres<T> {
     genres: IGenre[]
 }

 export type{
    IGenres,
     IGenre
 }
