class HashMap {
    #loadFactor = 0.75;
    #capacity = 16;
    #buckets;
    #entries = 0;

    constructor() {
        this.#buckets = new Array(this.#capacity);
        for (let i = 0; i < this.#capacity; i++) {
            this.#buckets[i] = [];
        }
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);

        let alreadyPresent = false;

        for (const kvp of this.#buckets[index]) {
            if (kvp[0] === key) {
                kvp[1] = value;
                alreadyPresent = true;
            }
        }

        if (!alreadyPresent) {
            this.#buckets[index].push([key, value]);
            this.#entries++;
        }

        if (this.#capacity * this.#loadFactor < this.#entries) {
            const oldBuckets = this.#buckets;

            this.#capacity *= 2;

            this.#buckets = new Array(this.#capacity);
            for (let i = 0; i < this.#capacity; i++) {
                this.#buckets[i] = [];
            }

            for (const bucket of oldBuckets) {
                for (const [key, value] of bucket) {
                    const newIndex = this.hash(key);
                    this.#buckets[newIndex].push([key, value]);
                }
            }
        }
    }

    get(key) {
        const index = this.hash(key);

        for (const kvp of this.#buckets[index]) {
            if (kvp[0] === key) {
                return kvp[1];
            }
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);

        for (const kvp of this.#buckets[index]) {
            if (kvp[0] === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);

        let toRemoveIndex = -1;

        for (let i = 0; i < this.#buckets[index].length; i++) {
            if (this.#buckets[index][i][0] === key) {
                toRemoveIndex = i;
            }
        }

        if (toRemoveIndex !== -1) {
            this.#buckets[index].splice(toRemoveIndex, 1);
            this.#entries--;
            return true;
        }

        return false;
    }

    length() {
        return this.#entries;
    }

    clear() {
        this.#buckets = new Array(this.#capacity);
        for (let i = 0; i < this.#capacity; i++) {
            this.#buckets[i] = [];
        }
        this.#entries = 0;
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.#buckets.length; i++) {
            for (let j = 0; j < this.#buckets[i].length; j++) {
                keys.push(this.#buckets[i][j][0]);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (let i = 0; i < this.#buckets.length; i++) {
            for (let j = 0; j < this.#buckets[i].length; j++) {
                values.push(this.#buckets[i][j][1]);
            }
        }
        return values;
    }

    entries() {
        return this.#buckets;
    }
}

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('lion', 'roar')
console.log(test.entries())
test.set('moon', 'silver')
console.log(test.entries())