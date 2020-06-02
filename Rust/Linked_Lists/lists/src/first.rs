// pub says we want people outside this module to be able to use List
pub enum List {
    Empty,
    Elem(i32, List),
}