import { Game }         from "../game.js";
import { GameObject }   from "../gameobject.js";
import { Tank }         from "../tank.js";
import { Turret }       from "../turret.js";
import { Vector }       from "../vector.js";
import { Bullet } from "./bullet.js";

export abstract class Projectile extends GameObject{
    
    // Field 
    private damage       : number = 15
    private speed        : number = 10
    private game         : Game
    private parentTurret : Turret
    private direction    : Vector;

    // Properties
    public get Damage()         : number        { return this.damage }
    public get ParentTurret()   : GameObject    { return this.parentTurret }
    
    constructor(type: string, tank : Tank) {
        super(type)

        this.parentTurret   = tank.Turret
        this.position       = this.parentTurret.Position
        this.rotation       = this.parentTurret.Rotation 
        this.direction      = Vector.getVectorFromAngle(this.rotation)

        // move the bullet in front of the barrel // TODO distance depends on tank.Data.armor
        let dist = 30
        this.position = this.Position.add(this.direction.scale(dist))
    }

    public update() {
        this.position = this.Position.add(this.direction.scale(this.speed))
        super.update();
        this.destroyOutOfWindow()
    }

    protected destroyOutOfWindow(projectile: Projectile) {
        if(this.position.x + this.width < 0 
            || this.position.y + this.height< 0 
            || this.position.x > window.innerWidth 
            || this.position.y > window.innerHeight
        ) {
            let index = this.game.gameObjects.indexOf(this)
            if(index > -1) { 
                this.game.gameObjects.splice(index,1)
            }
            this.div.remove()
        }      
        
    }

    

    public onCollision(target: GameObject): void {
        
    }
}