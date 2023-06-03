>## **Base de données ( en cours )**
```MERMAID
classDiagram
        User "1" -- "*" Post
        User "1" -- "*" Message
        User "1" -- "*" Friends
        User "1" -- "*" PrivateConversation
        Post "1" -- "*" Message
        Movie "1" -- "*" Post
        Categorie "*" -- "*" Movie
        Serie "1" -- "*" Post
        Categorie "*" -- "*" Serie
        User "1" -- "*" Form
        ConversationGroup "*" -- "1" User
        Serie "1" -- "*" Season
        Serie "1" -- "*" SerieOpinion
        Movie "1" -- "*" MovieOpinion
        PrivateConversation "1" -- "*" PrivateMessage
        PrivateMessage "*" -- "1" User
        Season "1" -- "*" mediaImage
        Serie "1" -- "*" mediaImage
        Movie "1" -- "*" mediaImage
        ConversationGroup "1" -- "*" ConversationGroupMessage
        GroupMember "*" -- "*" User
        GroupMember "*" -- "*" ConversationGroup
        
          class User {
              +int id pk
              +varchar userName 50
              +varchar email 255
              +varchar password 255
              +date dateOfBirth
              +datetime createdAt CurrentTimeStamp
              +varchar avatar
              +varchar colorTheme
              +json role
              +boolean activate
              +boolean ban
          }
          class Categorie {
              +int id 
              +varchar name 255
          }
          class Movie {
              +int id pk
              +varchar name
              +text synopsis
              +date addAt
              +float durable
              +int ageRequired
              +int releaseDate
              +json categories
              +boolean activate 
              +float note
          }
          class Serie {
              +int id pk
              +varchar name
              +text synopsis
              +date addAt
              +int releaseDate
              +int ageRequired
              +json categories
              +boolean activate 
              +float note
          }
          class Season {
            +int id pk
            +int seasonNumber
            +varchar name null
            +int Numberepisode
            +int releaseDate
            +int serieId
          }
          class mediaImage {
            +int id pk
            +varchar name
            +varchar film null
            +varchar serie null
            +varchar season null
            +varchar filepath
            +boolean active
          }
          class MovieOpinion {
            +int id pk
            +text opinion
            +varchar user
            +varchar movie
            +datetime sendAt CurrentTimeStamp
          }
          class SerieOpinion {
            +int id pk
            +text opinion
            +int user
            +int serie
            +datetime sendAt CurrentTimeStamp
          }
          class Post {
              +int id pk
              +text title
              +varchar serie null
              +varchar movie null
              +varchar owner
              +datetime createdAt CurrentTimeStamp
          }
          class Message {
              +int id pk
              +varchar user
              +varchar post
              +text message
              +datetime createdAt CurrentTimeStamp
          }
          class Form {
            +id pk
            +varchar pseudo
            +varchar userName
            +varchar userEmail
            +varchar request
            +varchar message
            +boolean rgpd
            +datetime sendAt CurrentTimeStamp
          }
          class PrivateConversation {
            +int id pk
            +varchar name
            +varchar userOne
            +varchar userTwo
          }
          class PrivateMessage {
              +int id pk
              +varchar user
              +varchar privateConvestion
              +text message
              +datetime sendAt CurrentTimeStamp
          }
          class Friends {
            +varchar userOne
            +varchar userTwo
          }
          class ConversationGroup {
            +int id pk
            +varchar name
            +varchar owner
          }
        class GroupMember {
            +int id pk
            +int member
            +int group
        }
          class ConversationGroupMessage{
            +int id pk
            +varchar conversationGroup
            +varchar user
            +text message
            +datetime sendAt CurrentTimeStamp
          }
```