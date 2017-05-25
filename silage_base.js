"use strict";
/**
 * Описание базовых возможностей Silage хранилища
 */
class SilageBase
{
    constructor(){
        this._store = [];
        this._nextPointer = 0;
        this._count = 0;
    }
    //================Publics================
    get count(){
        throw new Error("Not implemented");
    }

    PutOne(pData){
        throw new Error("Not implemented");
    }

    Put(pData){
        throw new Error("Not implemented");
    }

    Get(pID){
        throw new Error("Not implemented");
    }

    GetAll(){
        throw new Error("Not implemented");
    }

    GetNext(pLimit = 1){
        throw new Error("Not implemented");
    }
    
    Seek(pCursorPosition = 0){
        throw new Error("Not implemented");
    }

    Delete(pID){
        throw new Error("Not implemented");
    }

    DeleteAll(){
        throw new Error("Not implemented");
    }
        //================Technical methods================
        ValidateSilageImplementation(){
            if(!this.IsValidSilageImplementation())
                throw new Error("Invalid Silage implementation"); 
        }

        IsValidSilageImplementation(){
            var newInstance = new this.constructor();
            var allProperties = Object.getOwnPropertyNames((new SilageBase()).__proto__);
            //Удаляем методы кые не нужно проверять
            allProperties[allProperties.indexOf("constructor")] = null;
            allProperties[allProperties.indexOf("ValidateSilageImplementation")] = null;
            allProperties[allProperties.indexOf("IsValidSilageImplementation")] = null;
            //Проверяем все методы на исключения
            try
            {
                allProperties.forEach(prop => typeof(newInstance[prop]) === "function" && newInstance[prop]());
            }
            catch(pError)
            {
                return false;
            }
            return true;
        }
    //================Privates================

    get _autoIndex(){
        throw new Error("Not implemented");
    }
}