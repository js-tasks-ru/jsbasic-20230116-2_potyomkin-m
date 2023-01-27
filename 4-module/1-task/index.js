function makeFriendsList(friends) {
  let wrapper = document.createElement('ul');

  friends.forEach(friend => {
    let li = document.createElement('li');
    li.innerHTML = `${friend.firstName} ${friend.lastName}`;
    wrapper.appendChild(li);
  });
  
  return wrapper;
}
