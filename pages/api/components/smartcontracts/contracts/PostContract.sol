pragma solidity ^0.8.0;

contract PostContract{

    address owner;
    uint postcount=0;
    uint tipcount=0;

    struct PostDetail{
        uint postcount;
        address owner;
        string content;
        string imgurl;
    }

    struct TipDetail{
        address owner;
        address tipper;
        string tipamt;
    }

    mapping(uint => PostDetail) public Postdetails;
    mapping(uint => TipDetail) public Tipdetails;

    function addPost(string memory _content, string memory _imgurl) public{
        ++postcount;
        require(bytes(_content).length>0);
        Postdetails[postcount]=PostDetail(postcount, msg.sender, _content,_imgurl);
        
    }

    function addTip(address _owner, string memory _tipamt)public{
        ++tipcount;
        Tipdetails[tipcount]=TipDetail(_owner,msg.sender,_tipamt);
    }

    function getPost(uint _key) public view returns(PostDetail memory){
        return Postdetails[_key];
    }

    function getTip(uint _key)public view returns(TipDetail memory){
        return Tipdetails[_key];
    }

    function getCount() public view returns(uint){
        return postcount;
    }

    function getTipCount() public view returns(uint){
        return tipcount;
    }
}