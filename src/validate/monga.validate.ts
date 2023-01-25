const validate = (schema:any):string |boolean => {

    if(schema.validateSync()?.errors)  {
        return schema.validateSync()?.errors?.name?.message
    }  else{
        return false
    }
}

const validateBook = (schema:any):string |boolean => {

    if(schema.validateSync()?.errors)  {
        return schema.validateSync()?.errors?.title?.message
    }  else{
        return false
    }
}

export {validate, validateBook}