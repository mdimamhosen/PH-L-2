# Mongoose Aggregation Framework

An aggregation pipeline is a framework used in MongoDB to process and transform documents in a collection. It consists of multiple stages, where each stage performs a specific operation on the input documents and passes the results to the next stage.

- **$match**: Filters documents based on a specified condition. - **$group**: Groups documents by a specified expression and performs operations like sum, average, etc. - **$project**: Reshapes each document in the stream by including, excluding, or adding new fields. - **$sort**: Sorts documents by a specified field. - **$limit**: Limits the number of documents passed to the next stage. - **$lookup**: Joins documents from another collection. - **$out**: Writes the results to a specified collection.
