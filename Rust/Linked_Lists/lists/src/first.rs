struct Node {
    elem: i32,
    next: Link,
}

enum Link {
    Empty,
    More(Box<Node>),
}

pub struct List {
    head: Link,
}


impl List {
    pub fn new() -> Self {
        List { head: Link::Empty }
    }
}
