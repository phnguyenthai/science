
## 1. Association vs. Causation: The Core Difference

- **Association (Observation / Listening):**
    
      
    - **Definition:** Two variables $X$ and $Y$ are associated if observing the value of one provides statistical information about the other.
        
          
        
    - **Mathematical Representation:**
        
          
        
        $$P[Y = y \mid X = x] \neq P[Y = y]$$
        
    - **Example:** Ice cream sales ($X$) and monthly drownings ($Y$). On months with high ice cream sales, drownings are also higher. However, seeing high ice cream sales doesn't mean ice cream _caused_ the drownings.
        
          
        
- **Causation (Intervention / Doing):**
    
      
    - **Definition:** $X$ causes $Y$ if _intervening_ to set the value of $X$ changes the probability of $Y$.
        
          
        
    - **Mathematical Representation (Pearl's `do`-operator):**
        
          
        
        $$P[Y = y \mid \text{do}[X = x]] > P[Y = y]$$
        
    - **Example:** Banning or forcing ice cream sales ($\text{do}[X = x]$) will not alter drowning rates. On the other hand, smoking tobacco increases the likelihood of lung cancer under intervention, so smoking _is_ a cause of lung cancer.
        
          
        

## 2. Understanding Confounders (Figure 1)

> **Confounder ($Z$):** A variable that influences both $X$ and $Y$, creating a non-causal association between them.
> 
>   

```
  Before Intervention          After do[X = x]
      (Observation)             (Intervention)

         ( Z )                      ( Z )
        /     \                       \
    1  /       \ 2                     \ 2
      v         v                       v
     (X)       (Y)             (X)     (Y)
```

1. **Before Intervention (Left side of Figure 1):**
    
      
    - **Mechanism:** $Z$ (e.g., warm weather) causes both $X$ (ice cream sales) via Arrow 1 and $Y$ (drownings / swimming activity) via Arrow 2.
        
          
        
    - **Result:** $X$ and $Y$ move together because they share a common root ($Z$), even though there is no direct arrow between $X$ and $Y$.
        
          
        
2. **After Intervention (Right side of Figure 1):**
    
      
    - **Mechanism:** When a researcher applies the `do`-operator ($\text{do}[X = x]$), they manually set $X$.
        
          
        
    - **Action:** Arrow 1 ($Z \rightarrow X$) is removed because $X$ is now entirely controlled by the researcher, not by $Z$.
        
          
        
    - **Result:** $X$ is completely disconnected from $Y$. Changing $X$ has zero impact on $Y$, proving that $X$ does not cause $Y$.
        
          
        

## 3. Key Takeaways

1. **Language Distinction:** Observational statistics uses conditional probabilities ($P[Y \mid X]$). Causal inference requires interventional notation ($P[Y \mid \text{do}[X]]$).
    
      
    
2. **Directionality:** Association is symmetric, but causation is strictly directional ($X \rightarrow Y$ does not mean $Y \rightarrow X$).
    
      
    
3. **Sequencing:** Causation requires temporal sequence: $X$ is set first, and $Y$ responds after.
    
      
    
4. **Ceteris Paribus:** In economics, the "all else equal" assumption literally means performing a `do`-operation while freezing other background mechanisms represented in the causal graph.