export interface Issues{
    name:string;
    email:string;
    number:number;
    issues:string;
    _id?:string
}

export interface IProps {
    modalIsOpen: any;
    closeModal: any;
    name: string;
    issues: string;
    email: string;
    id: string
    number: string;
    handleClick: any
    setError: any
    setSeverity: any
    setOpen: any
}