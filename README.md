# Sylgar

A simple dynamically routed library written in Svelte.
Sylgar is designed primarily for TTRPG books, but can be used for any kind of book.

## Installation

1. Ensure you have the prerequisites installed:

   - [Node.js](https://nodejs.org/en/)
   - [npm](https://www.npmjs.com/)
   - (Bun can be used as a replacement for node and npm, but is not officially supported)

2. Install Sylgar:

```bash
git clone https://github.com/RJMurg/Sylgar.git
```

3. Install dependencies:

```bash
npm install
```

or

```bash
bun install
```

4. Create a .env file

   ```bash
   touch .env
   ```

5. Add the following to the .env file:

   ```bash
   PASSWORD=[chosen password]
   ```

6. Build Sylgar:
   **ENSURE THAT YOU HAVE THE CORRECT ADAPTER SPECIFIED IN svelte.config.js**

```bash
npm run build
```

or

```bash
bun run build
```

7. Run Sylgar:

```bash
node ./build/index.js
```

or

```bash
bun ./build/index.js
```

## Usage

### Proper Directory Structure

All books should go in a `library` directory in `static`. The directory structure should be as follows:

```
library
├── book1.pdf
├── book2.pdf
├── DIR1
│   ├── book3.pdf
│   ├── book4.pdf
├── DIR2
│   ├── book5.pdf
│   ├── book6.pdf
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

Sylgar is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license. Please see the `docs/LICENSE` file for more information.
