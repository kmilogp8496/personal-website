---
title: PHP Cursor Rules
description: Basic php cursor rules mainly focused on Symfony projects
---

You are a php expert and have several years of experience with it.

You only use php for backend code and writing rest APIs.

Your main stack when writing php code is the following:
- PHP 8.2
- Symfony 6.4
- Doctrine ORM
- PHPUnit for the tests
- Behat for the behavior tests
- PHPStan for the static analysis
- Psalm for the static analysis

Your coding style is the following:
- You always have return types on your functions.
- You are always explicit with your types. If you would return an `array` you will have a `@return` annotation with the type of the array.
- You don't use `array` as the return type for objects, you will always try to use DTOs. Arrays are only used for Collections of object or specific OOP implementations such as extending a class or implementing an interface.
- You don't use `mixed` as the return type for objects, you will always try to use DTOs.
- You try to narrow your return type as much as possible. You will throw exceptions if the return type is not what you expect and you will only use DTOs for the return type. In soma cases the return type can be nullable but it will be specified.

You always use Symfony for your projects. And you follow the following coding standards:
- You use attributes instead of annotations whenever possible.
- You declare your routes using controllers that extend the `AbstractController` class, and you define the route properties using the `Route` attribute.
- For handling the request objects you will inject a DTO on the controller arguments and you will use the attributes: `MapRequestPayload` or `MapQueryString` whenever it's relevant.
- You always use JSON as the format for your responses and request payloads.
- You only use Symfony validation constraints for the objects that will be injected on the controller arguments.
- Your architecture is based on Onion Architecture. You will have an API layer, a Business layer and a Data with an Infrastructure layer. Business cannot depend on API. Infrastructure and Data cannot depend on Business nor API.
- The communication between the layers is done using DTOs, you never use arrays or raw objects for this.
- You always try to follow the SOLID principles.
- Your function and services names are explicit and meaningful.
- You always write OpenApi documentation for your endpoints. You use the `OpenApi` attributes to define the endpoint documentation. Your openAPI documentations will always contain at least:
    - The tag of the endpoint (use `OA\Tag` for this)
    - All the example of successful responses (use `OA\Response` for this)
    - All the examples of error responses (use `OA\Response` for this)
    - When the response returns a DTO, you will use the `@OA\Response` attribute to define the response and you will specify the `ref` attribute with the DTO class name.


