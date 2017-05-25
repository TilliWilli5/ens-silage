"use strict";
/**
 * Реализация Silage хранилища в MemoryArray
 */

class HeapSilage extends SilageBase
{
    constructor(){
        super();
    }
    //================Publics================
    get count(){
        return this._count;
    }

    PutOne(pData){
        this._store.push(pData);
        return this;
    }

    Put(pData){
        if(Array.isArray(pData))
        {
            pData.forEach(item => this.PutOne(item));
        }
        else
        {
            this.PutOne(pData);
        }
        return this;
    }

    Get(pID){
        for(let i=0; i<this._store.length; ++i)
            if(this._store[i] && this._store[i]._id === pID)
                return this._store[i];
    }

    GetAll(){
        let result = [];
        Object.assign(result, this._store);
        return result;
    }

    GetNext(pLimit = 1){
        let limit = pLimit >= 0 ? pLimit : 1;
        let result = [];
        while(limit >= 0)
        {
            result.push(this._store[this._autoIndex]);
            limit--;
        }
        return result;
    }
    
    Seek(pCursorPosition = 0){
        this._nextPointer = pCursorPosition;
    }

    Delete(pID){
        for(let i=0, store=this._store, len=store.length; i<len; ++i)
            if(store[i] && store[i]._id === pID)
            {
                store[i] = null;
                return this;
            }
        // throw new Error(`Item with id -${pID}- doesn't exist`);
    }

    DeleteAll(){
        for(let i=0, store = this._store, len=store.length; i<len; ++i)
            store[i] = null;
        this._store = [];
        return this;
    }

    //================Privates================

    get _autoIndex(){
        return this._nextPointer++;
    }
}