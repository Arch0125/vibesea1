pragma solidity ^0.8.0;

contract PostContract{

    address owner;
    uint postcount=0;

    struct PostDetail{
        uint postcount;
        address owner;
        string content;
        string imgurl;
    }

    mapping(uint => PostDetail) public Postdetails;

    function addPost(string memory _content, string memory _imgurl) public{
        ++postcount;
        require(bytes(_content).length>0);
        Postdetails[postcount]=PostDetail(postcount, msg.sender, _content,_imgurl);
        
    }

    function getPost(uint _key) public view returns(PostDetail memory){
        return Postdetails[_key];
    }

    function getCount() public view returns(uint){
        return postcount;
    }
}