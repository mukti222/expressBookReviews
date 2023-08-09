const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



//TASK6 TASK 6 TASK 6 TASK6
  public_users.post("/register", (req,res) => {
    const doesExist = (username)=>{
        let userswithsamename = users.filter((user)=>{
          return user.username === username
        });
        if(userswithsamename.length > 0){
          return true;
        } else {
          return false;
        }
      }

    const username = req.query.username;
    const password = req.query.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });



//TASK 1 TASK 1 TASK 1 TASK 1 TASK 1 TASK 1
// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books, null, 4))});
//TASK1 w/PROMISE TASK1 w/PROMISE TASK1 w/PROMISE TASK1 w/PROMISE
const listBooks = async () => {
	try{
		const getBooks = await Promise.resolve (books)
		if (getBooks) {
			return getBooks
		} else {
			return Promise.reject (new error('Books not found'))
		}
	} catch (error) {
		console.log (error)}}


public_users.get('/',async (req, res)=> {
  const listBook = await listBooks()
  res.json (listBook)
});








// Get book details based on ISBN
//TASK 2 TASK 2 TASK 2 TASK 2 TASK 2 TASK 2 TASK 2
public_users.get("/isbn/:isbn", (req, res) => {
    let isbn = req.params.isbn;
    if (books.hasOwnProperty(isbn)) {
        res.json(books[isbn]);
    } else {
        res.status(404).json({ message: "Book not found" });}});
//TASK2 w/PROMISE TASK2 w/PROMISE TASK2 w/PROMISE TASK2 w/PROMISE TASK2 w/PROMISE
const searchByISBN=async(isbn)=>{
    try{
      const getISBN=await Promise.resolve(isbn);
      if(getISBN){
        return Promise.resolve(isbn)
      }
      else{
        return Promise.reject(new error("Book with the isbn not found!"));
      }
    }
    catch(error){
      console.log(error);}}
  
  public_users.get('/isbn/:isbn',async(req,res)=>{
    const isbn=req.params.isbn;
    const returnedIsbn=await searchByISBN(isbn);
    res.send(books[returnedIsbn]);
  })

  



//TASK 3 TASK 3 TASK 3 TASK 3 TASK 3 TASK 3 TASK 3
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let matchingBooks = [];
  
    // Loop through all books and find those that match the given author
    for (let isbn in books) {
      if (books[isbn].author === author) {
        matchingBooks.push(books[isbn]);
      }
    }
  
    if (matchingBooks.length > 0) {
      res.json(matchingBooks);
    } else {
      res.status(404).json({ message: "No books found for the given author" });
    }
  });
//TASK3 w/PROMISE TASK3 w/PROMISE TASK3 w/PROMISE TASK3 w/PROMISE
const searchByAuthor=async(author)=>{
    try{
      if(author){
        const authBook=[];
        Object.values(books).map((book)=>{
        if(book.author===author){
          authBook.push(book);
        }})
        return Promise.resolve(authBook);
      }else{
        return Promise.reject(new error("Book with the author name not found!!!"));}}
    catch(error){
      console.log(error);}}
      public_users.get('/author/:author',async(req,res)=>{
      const author=req.params.author;
      const data=await searchByAuthor(author);
      res.send(data);
    })
  










// Get all books based on title
//TASK 4 TASK 4 TASK 4 TASK 4 TASK 4 TASK 4
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let matchingBooks1 = [];
  
    // Loop through all books and find those that match the given author
    for (let isbn in books) {
      if (books[isbn].title === title) {
        matchingBooks1.push(books[isbn]);
      }
    }
  
    if (matchingBooks1.length > 0) {
      res.json(matchingBooks1);
    } else {
      res.status(404).json({ message: "No books found for the given author" });
    }
  });


//TASK4 w PROMISE, TASK4 w PROMISE, TASK4 w PROMISE TASK4 w PROMISE
const searchByTitle=async(title)=>{
    try{
      
      if(title){
        const titleBook=[];
        Object.values(books).map((book)=>{
        if(book.title===title){
          titleBook.push(book);
        }})
        return Promise.resolve(titleBook);
      }
      else{
        return Promise.reject(new error("Book with the author name not found!!!"));
      }
      
    }
    catch(error){
      console.log(error);
    }
  }
    public_users.get('/title/:title',async(req,res)=>{
      const title=req.params.title;
      const data=await searchByTitle;
      res.send(data);
    })
  
  
  




//  Get book review
// TASK 5 TASK 5 TASK 5 TASK 5 TASK 5 TASK 5
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    if (books.hasOwnProperty(isbn)) {
        let reviews = books[isbn].reviews;
        res.json(reviews);
    } else {
        res.status(404).json({ message: "Book not found" });}});

module.exports.general = public_users;
