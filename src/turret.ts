import { Tank }         from "./tank.js";
import { GameObject }   from "./gameobject.js";
import { Vector }       from "./vector.js";
import { Projectile } from "./projectiles/projectile.js";

export class Turret extends GameObject {
       
    // Fields
    private tank : Tank
    private projectile : Projectile
    private speed : Vector = new Vector(0, 0)
    
    // Properties
    public get Projectile() : Projectile { return this.projectile }

    constructor(tank : Tank) {
        super("tank-turret")

        this.tank = tank
    }

    public update() {
        this.position   = new Vector(this.tank.Position.x, this.tank.Position.y)
        this.speed      = this.tank.Speed
        this.rotation   = this.tank.Rotation

        super.update()
    }

    onCollision(target: GameObject): void {
        throw new Error("Method not implemented.");
    }
}