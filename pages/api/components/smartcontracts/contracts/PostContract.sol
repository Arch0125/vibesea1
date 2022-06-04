pragma solidity ^0.8.0;

contract PostContract{

    address owner;
    uint postcount=1;

    struct PostDetail{
        uint postcount;
        address owner;
        string content;
        string imgurl;
    }

    mapping(uint => PostDetail) public Postdetails;

    function addPost(string memory _content, string memory _imgurl) public{
        require(bytes(_content).length>0);
        Postdetails[postcount]=PostDetail(postcount, msg.sender, _content,_imgurl);
        postcount++;
    }

    function getPost(uint _key) public view returns(PostDetail memory){
        return Postdetails[_key];
    }
}